		const djControllerStore = {
				177:{
				 'pitch-left':8,
				 'gain-left':5,
				 'high-left':4,
				 'low-left':2,
				 'filter-left':1,
				 'left-fade':0,
				 'left-platter-rim':9,
				 'left-platter':10,
				},
				178:{
				 'pitch-right':8,
				 'gain-right':5,
				 'high-right':4,
				 'low-right':2,
				 'filter-right':1,
				 'right-fade':0,
				 'right-platter-rim':9,
				 'right-platter':10,
				},
				176:{
				 'browse-knob':1,
				 'master-knob':3,
				 'headphones-knob':4,
				 'cross-fade':0,
				},
				145:{
					'load-left':13,
					'headphone-left':12,
				  'shift-left':4,
					'sync-left':5,
					'cue-left':6,
					'play-left':7,
			 		'hot-cue-left':15, 
				  'roll-left':16,
					'vinyl-left':3,
					'in-left':9,
					'out-left':10,
					'left-platter-touch':8,
				},
				144:{
					'browse-button':0,
					'assistant-button':3,
					'master-button':2,
					'beatmatch-button':1,
				},
				146:{
					'load-right':13,
					'headphone-right':12,
				  'shift-right':4,
					'sync-right':5,
					'cue-right':6,
					'play-right':7,
					'roll-right':16,
			 		'hot-cue-right':15, 
					'vinyl-right':3,
					'in-right':9,
					'out-right':10,
					'right-platter-touch':8,
				},
			  150:{
					'drum-left-one':0,
					'drum-left-two':1,
					'drum-left-three':2,
					'drum-left-four':3,
				},
			  151:{
					'drum-right-one':0,
					'drum-right-two':1,
					'drum-right-three':2,
					'drum-right-four':3,
				},
				targetTag:'',
		}

		navigator.requestMIDIAccess().then(getMIDIInputs);

		function getMIDIInputs(MIDIAccess){
		  for(const input of MIDIAccess.inputs) {
				input[1].onmidimessage = (midiMessage) => {
					console.log("midi message: ",midiMessage.data);

					const [channel, controlNumber, controlValue] = midiMessage.data;
          matchMessageToControllerStore(channel,controlNumber,controlValue);
					updateMidiView(controlValue);
				};
		  }
		};

		function matchMessageToControllerStore(channel,controlNumber,controlValue){
			for(const channelLabel in djControllerStore){
				if(+channelLabel !== channel){continue};
					for (const tagName in djControllerStore[channelLabel]){
						if(djControllerStore[channelLabel][tagName] !== controlNumber){continue};
						console.log('tag: ',tagName,controlNumber);
						djControllerStore.targetTag = tagName;
							getPitchMessage(tagName, controlValue);
							getPulseMessage(tagName, controlValue);
							getSynthMessage(tagName, controlValue);
					}
				}
		};

		function updateMidiView(controlValue){
			if(!djControllerStore.targetTag){return};
				const targetElement = document.querySelector(djControllerStore.targetTag)
					.children[0];
				targetElement.innerHTML = `${controlValue}`;
		};

