document.getElementsByClassName("audio-button")[0].addEventListener("click", async () => {
	await Tone.start();
	console.log("audio is ready");
});

function mySynthFactory(){
	const osc = new Tone.OmniOscillator({type: 'square'});
	const oscGain = new Tone.Gain(-0.5);
	const ampEnv = new Tone.AmplitudeEnvelope({
			attack:0.01,
			decay:0.5,
	}).toDestination();
	const filter = new Tone.Filter(
		{
			rolloff:-24,
			Q:5,
		}
	);
	const filterEnv = new Tone.FrequencyEnvelope({
			attack:0.01,
			sustain: 0.5,
			decay:0.5,
			baseFrequency: 200,
			octaves: 2,
	});
	const filterGain = new Tone.Gain(0.5);
	osc.chain(oscGain,filter,ampEnv).start();
	filterEnv.chain(filterGain,filter.frequency);

	return{
		triggerAttackRelease:function (note,duration,time) {
			osc.set({frequency: note});
			ampEnv.triggerAttackRelease(duration,time);
			filterEnv.triggerAttackRelease(duration,time);
		},
		setFilter:function (controlValue) {
      filterEnv.set({baseFrequency:controlValue});
		},
		setFilterQ:function (controlValue) {
      filter.set({Q:controlValue / 10});
		},
		setFilterEnv:function (controlValue) {
			console.log('filter sus: ',controlValue / 72);
      filterSignal.set({value:(controlValue / 72)});
		},
	};
}
mySynthFactory();

const my = mySynthFactory();

function getSynthMessage(tagName,controlValue){
	switch(tagName){
		case 'filter-left':
			my.setFilter(controlValue);
		break;
		case 'low-left':
			my.setFilterQ(controlValue);
		break;
		case 'high-left':
			my.setFilterEnv(controlValue);
		break;
	};
};

const am = new Tone.MonoSynth({
	oscillator:{
		type: 'square',
	},
	filter:{
		rolloff:'-24',
	},
	filterEnvelope:{
		attack:0.5,
		decay:0.5,
		baseFrequency: 150,
		octaves: 2,
	},
	volume:-15,
	portamento:0.05,
	detune:50,
}).toDestination();

let sequenceStage = 0;
let stagePlays = 1;

const loop = new Tone.Loop((time,note) => {
	//console.log('sequenceStage: ',sequenceStage);
	//console.log('stagePlays: ',stagePlays);
	//console.log('pulse value: ',pulseControl.getStage(sequenceStage));
	const currentPitch = pitchControl.getPitchStage(sequenceStage);
	console.log('current pitch: ',);
	my.triggerAttackRelease(currentPitch,'32n',time,1);
	let increment = 0;
	if(stagePlays === pulseControl.getStage(sequenceStage)){
		increment = 1;
		stagePlays = 1;
	}else{
		stagePlays += 1;
	};
  flashCurrentTriggerLight(increment);
	sequenceStage = (sequenceStage + increment) % 8;
},'8n').start(0);

Tone.Transport.start(0);


