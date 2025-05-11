
function controlTriggerLightsFactory(){
	 let selectIndex = 0;
	 const triggerLights = {
		 'trigger-light-one':0,
		 'trigger-light-two':0,
		 'trigger-light-three':0,
		 'trigger-light-four':0,
		 'trigger-light-five':0,
		 'trigger-light-six':0,
		 'trigger-light-seven':0,
		 'trigger-light-eight':0,
	 };
	 const triggerKeys = Object.keys(triggerLights);
	 function getSelectIndex(){
	 	return selectIndex;
	 };
	 return{
		 incrementSelectIndex:function (increment) {
		 	selectIndex = (selectIndex + increment) % 8;
			console.log('select light: ',selectIndex);
		 },
		 getCurrentTriggerLightValue:function () {
      return triggerLights[triggerKeys[selectIndex]];
		 },
		 getTriggerLightValue:function (name) {
			 return triggerLights[name];
		 },
		 setCurrentTriggerLightValue:function (value) {
		 	triggerLights[triggerKeys[selectIndex]] = value;
		 },
		 toggleCurrentTriggerLightValue:function () {
			 const currentTrigger = this.getCurrentTriggerLightValue();
			 this.setCurrentTriggerLightValue(
				 currentTrigger ? 0 : 1
			 );
		 },
	 };
};
 const controlTriggerLights = controlTriggerLightsFactory();

 function updateTriggerLights(){
	 const triggerLights = document.querySelectorAll('trigger-light');
	 for(const light of triggerLights){
		 const lightValue = controlTriggerLights.getTriggerLightValue(light.classList[0]);
		 light.style.background = lightValue ? 'black' : 'white';
	 };
 };


 function flashCurrentTriggerLight(increment){
	 controlTriggerLights.toggleCurrentTriggerLightValue();
	 updateTriggerLights();
	 controlTriggerLights.toggleCurrentTriggerLightValue();
	 controlTriggerLights.incrementSelectIndex(increment);
 };
