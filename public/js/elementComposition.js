function makeElementsFactory(){
		let crossClassIndex = 0;
		function repeatElement ({
					elementTag,
					parent,
					listOfClassLists,
					staticClass,
					childrenMap,
					propList,
					childClasses,
					crossClass,
					classString,
		})
		{
			let crossIndex = 0;
			let element = {};

      function createFromClassLists(){
		   const [ firstList ] = listOfClassLists;
			console.log('class lists');
		   firstList.forEach((classItem,i) => {
		   	element = document.createElement(elementTag);
		   	let classString = '';
		   	listOfClassLists.forEach((list,j) => {
		   		if(j > 0){ classString += ' '; };
		   		classString += list[i];
		   	});
				if(staticClass){
					classString += ` ${staticClass}`;
				};
		   	element.setAttribute(
		   		'class',
		   		classString,
		   	);
		   	if(propList){
		   		propList.forEach(prop => {
		   			element.setAttribute(
		   				prop.name,
		   				prop.value,
		   			);
		   		});
		   	}
		   	parent.appendChild(element);
				if(childrenMap){
					makeChildFromMap();
				};
		   });
		  };

      function makeChildFromMap(){
		  	console.log('makeChildFromMap',crossIndex);
		   for(const child of childrenMap){
		   	repeatElement({
		   		elementTag: child.tag,
		   		parent: element,
		   		childClasses:child.classes,
		   		propList:child.props,
					crossClass:child.crossClass,
		   	});
		   }
		  };

			if(listOfClassLists){
				createFromClassLists();
				console.log('class list condition',element);
			};
			if(childClasses){
			 const child = document.createElement(elementTag);
				console.log('child classes condition',child);
			 let classString = childClasses;
			 if(crossClass){
				classString = crossClass[crossIndex];
				crossIndex += 1;
			 };
			 child.setAttribute(
			 	'class',
			 	classString,
			 );
			 if(propList){
			 	propList.forEach(prop => {
			 		child.setAttribute(
			 			prop.name,
			 			prop.value,
			 		);
			 	});
			 }
			 parent.appendChild(child);
			};
		}
	return{
		repeatElement: repeatElement,
	}
}
const makeElements = makeElementsFactory();

const stages = document.querySelector('stages-replace');

function makeEnumeratedArray(prefix){
	const numbers = [
		'one',
		'two',
		'three',
		'four',
		'five',
		'six',
		'seven',
		'eight',
		'nine',
	];
	return numbers.reduce((acc,cur) =>
		[...acc,`${prefix}-${cur}`]
	,[]);
};

const pitchList = makeEnumeratedArray('pitch');
const triggerList = makeEnumeratedArray('trigger-light');

//makeElements.repeatElement({
//	elementTag: 'section',
//	parent: stages,
//	listOfClassLists: [pitchList],
//	staticClass:'pitch-section',
//	childrenMap: [
//		{tag:'input',
//			classes:'pitch-section',
//			crossClass:pitchList,
//			props:[{name:'type',value:'range'}],
//		},
//		{tag:'p',classes:'select-indicator'},
//		{tag:'p',classes:'note-indicator'},
//		{tag:'trigger-light',
//		 class:'grid-item',
//		 parentList: pitchList,
//		 classes:'trigger-light',
//		 //props:[{name:'id',value:'what?'}],
//		 crossClass:triggerList,
//		},
//		//{tag:'figure',
//		// class:[octaveList,'octave-indicator','grid-item'],
//		//},
//	],
//});







