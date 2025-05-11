function padControllerFactory(){
	const padControllerStore = [
		//(One button row example)
		//0:[
		//		{onOrOff:'off',controlNumber:0},
		//		{onOrOff:'off',controlNumber:1},
		//		{onOrOff:'off',controlNumber:2},
		//		{onOrOff:'off',controlNumber:3},
		//		{onOrOff:'off',controlNumber:4},
		//		{onOrOff:'off',controlNumber:5},
		//		{onOrOff:'off',controlNumber:6},
		//		{onOrOff:'off',controlNumber:7},
		//],
	];
	let rowStart = 0;

	for(let i = 0;i < 8;i++){
		padControllerStore[i] = Array(8).fill(0).map((button,j) => (
			{
				onOrOff:'off',
				controlNumber:rowStart + j,
				location:[i,j],
			})
		);
		rowStart += 16;
	}
	const padColors = {
			'white': 10,
			'yellow': 20,
			'light-blue': 40,
			'purple': 50,
			'blue': 70,
			'green': 90,
			'red': 100,
  }

	const mode = [
		'pulses',
		'octaves',
		'pitches',
	];
	let modeIndex = 0;

	function colorToVelocity(color){
  	return padColors[color];	
	};

	function getPadFromStore([row,column]) {
   return padControllerStore[row][column]; 
	};

	function locationToControlNumber([row,column]){
		return padControllerStore[row][column].controlNumber;
	};

	function controlNumberToLocation(controlNumber){
		for(const row of padControllerStore){
			for(const pad of row){
        if(pad.controlNumber !== controlNumber){continue};
				return pad.location
			}
		};
	};

	let output = undefined;

	return{
		interaction:function (message) {
			const [channel,controlNumber,controlValue] = message;
    	//switch(getCurrentPage()){
			//	case 'pulses':
			//		sendPulsesMessage();
			//	break;
			//}	
      const location = controlNumberToLocation(controlNumber);
			const sendPulsesMessage = () => {
      	this.padPressToColumn(
					location,
          'white'
				)
				pulseControl.setPulseCount(location[1],8 - location[0]);
				updatePulseIndicator();
			};
			sendPulsesMessage();
		},
		defineOutput:function (definition) {
			output = definition;
			console.log('output: ',output);
		},
		send:function (message) {
			let [channel,controlNumber,velocity] = message;

			velocity = typeof velocity === 'string' ?
				colorToVelocity(velocity) :
				velocity;

			controlNumber = typeof controlNumber === 'object' ?
				locationToControlNumber(controlNumber) :
				controlNumber;

			message = [channel,controlNumber,velocity];
			if(output === undefined){
				throw Error(
					'Output needs to be defined first with defineOutput method of padControllerFactory'
				);
			};
			console.log('message: ',message);
			output.send(message);
		},
		makeColumn:function (root,length,color) {
			let resetLocation = [0,root[1]];
			for(let i = 0; i < 8; i++){
				this.send([
					128,
					resetLocation,
					0,
				])
				resetLocation = [resetLocation[0] + 1,resetLocation[1]];
			};

			let currentLocation = root;
			for(let i = 0; i < length; i++){
				this.send([
					144,
					currentLocation,
					color,
				]);	
				currentLocation = [currentLocation[0] + 1,currentLocation[1]];
			};
		},
		padPressToColumn:function (root,color) {
			this.makeColumn(root,8 - root[0],color);
		},
		getStore:function () {
			return padControllerStore; 
		},
	};
}

const padController = padControllerFactory();
navigator.requestMIDIAccess().then(getMIDI);

	function getMIDI(MIDIAccess){
		getMIDIOutputs(MIDIAccess);
		getMIDIInputs(MIDIAccess);
	};

	function getMIDIInputs(MIDIAccess){
		for(const input of MIDIAccess.inputs) {
			let smartPad = {};
			if(input[1].name !== "SmartPAD:SmartPAD MIDI 1 20:0"){
				continue;
			}
			console.log('pad input: ',input[1].name);
			smartPad = input[1];
			smartPad.onmidimessage = (midiMessage) => {
				console.log("pad midi message: ",midiMessage.data);

				const [channel, controlNumber, controlValue] = midiMessage.data;
				padController.interaction(midiMessage.data);
			};
		}
	};

	function getMIDIOutputs(MIDIAccess){
		for(const output of MIDIAccess.outputs) {
			let smartPad = {};
			if(output[1].name !== "SmartPAD:SmartPAD MIDI 1 20:0"){
				continue;
			}
			smartPad = output[1];
			smartPad.send([144,0,127]);
			padController.defineOutput(smartPad);
		  function resetPads(){
				for(const rowOfPads of padController.getStore()){
					for(const pad of rowOfPads){
						padController.send([128,pad.controlNumber,0]);
					}
				}; 
			};
			resetPads();
      //padController.send([144,0,'white']);
      //padController.send([144,1,'yellow']);
      //padController.send([144,2,'light-blue']);
      //padController.send([144,3,'purple']);
      //padController.send([144,4,'blue']);
      //padController.send([144,5,'green']);
      //padController.send([144,6,'red']);
      //padController.send([144,7,0]);
		}
	};

