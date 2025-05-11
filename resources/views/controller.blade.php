 <!DOCTYPE html>
<html lang="en">
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
		<link rel="stylesheet" href="{{asset('/css/controller.css')}}">
		<link rel="stylesheet" href="{{asset('/css/sequencer.css')}}">
		<style>
		:root{
			margin:0;
			padding:0;
		}
		page{
			width: 100vw;
			height: 100vh;
			display: grid;
			justify-items: center;
			align-items: center;
			grid-template-rows: 1fr 1fr;
			grid-template-areas:
				'top'
				'bottom';
		}
		.grid-item{
			display: grid;
			border: .2rem solid gray;
			justify-items: center;
			align-items: center;
		}
		.border{
			border: .2rem solid gray;
		}
		</style>
	</head>
	<body>

		<page>
			<sequencer>
				<button class='audio-button'>
					Start Audio
				</button>
				<stages>
					@for ($i = 1; $i <= 8; $i++)
						<x-pitch-section :number="$i" />
					@endfor

					@for ($i = 0; $i <= 7; $i++)
						<x-pulse-section :number="$i" />
					@endfor
				</stages>

				<channel-one></channel-one>
				<channel-two></channel-two>
				<channel-three></channel-three>
				<channel-four></channel-four>
				<channel-five></channel-five>
				<channel-six></channel-six>
				<channel-seven></channel-seven>

			</sequencer>

			<controller>

					<left-table>

							<left-platter class='grid-item'>
								<p>0</p>
								<left-platter-touch>
									<p>0</p>
								</left-platter-touch>
								<left-platter-rim>
									<p>0</p>
								</left-platter-rim>
							</left-platter>

							<left-bottom-buttons>
								<left-side-buttons>
									<vinyl-left class='grid-item'>
										<p>0</p>
									</vinyl-left>
									<in-left class='grid-item'>
										<p>0</p>
									</in-left>
									<out-left class='grid-item'>
									  <p>0</p>
									</out-left>
							 </left-side-buttons>

								<left-side-bottom-buttons>
										<shift-left class='grid-item'>
								     <p>0</p>
										</shift-left>
										<hot-cue-left class='grid-item'>
											 <p>0</p>
										</hot-cue-left>
										<roll-left class='grid-item'>
											 <p>0</p>
										</roll-left>
									<left-shift-to-play>
										<sync-left class='grid-item'>
											 <p>0</p>
										</sync-left>
										<cue-left class='grid-item'>
											 <p>0</p>
										</cue-left>
										<play-left class='grid-item'>
											 <p>0</p>
										</play-left>
									</left-shift-to-play>
									<drum-left-one class='grid-item border'>
											 <p>0</p>
									</drum-left-one>
									<drum-left-two class='grid-item border'>
											 <p>0</p>
									</drum-left-two>
									<drum-left-three class='grid-item border'>
											 <p>0</p>
									</drum-left-three>
									<drum-left-four class='grid-item border'>
											 <p>0</p>
									</drum-left-four>
									<pitch-left class='grid-item'>
											 <p>0</p>
									</pitch-left>
								</left-side-bottom-buttons>
							</left-bottom-buttons>

					</left-table>

					<right-table>

							<right-platter class='grid-item'>
								<p>0</p>
								<right-platter-touch>
									<p>0</p>
								</right-platter-touch>
								<right-platter-rim>
									<p>0</p>
								</right-platter-rim>
							</right-platter>

							<right-bottom-buttons>
								<right-side-buttons>
									<vinyl-right class='grid-item'>
										<p>0</p>
									</vinyl-right>
									<in-right class='grid-item'>
										<p>0</p>
									</in-right>
									<out-right class='grid-item'>
									  <p>0</p>
									</out-right>
								</right-side-buttons>

								<right-side-bottom-buttons>
										<shift-right class='grid-item'>
								     <p>0</p>
										</shift-right>
										<hot-cue-right class='grid-item'>
											 <p>0</p>
										</hot-cue-right>
										<roll-right class='grid-item'>
											 <p>0</p>
										</roll-right>
									<right-shift-to-play>
										<sync-right class='grid-item'>
											 <p>0</p>
										</sync-right>
										<cue-right class='grid-item'>
											 <p>0</p>
										</cue-right>
										<play-right class='grid-item'>
											 <p>0</p>
										</play-right>
									</right-shift-to-play>
									<drum-right-one class='grid-item border'>
											 <p>0</p>
									</drum-right-one>
									<drum-right-two class='grid-item border'>
											 <p>0</p>
									</drum-right-two>
									<drum-right-three class='grid-item border'>
											 <p>0</p>
									</drum-right-three>
									<drum-right-four class='grid-item border'>
											 <p>0</p>
									</drum-right-four>
									<pitch-right class='grid-item border'>
											 <p>0</p>
									</pitch-right>
								</right-side-bottom-buttons>
							</right-bottom-buttons>

					</right-table>

						<middle>
							<left-middle>
								<load-left class='left-middle-class'>
									<p>0</p>
								</load-left>
								<gain-left class='left-middle-class'>
									<p>0</p>
								</gain-left>
								<high-left class='left-middle-class'>
									<p>0</p>
								</high-left>
								<low-left class='left-middle-class'>
									<p>0</p>
								</low-left>
								<filter-left class='left-middle-class'>
									<p>0</p>
								</filter-left>
								<headphone-left class='left-middle-class'>
									<p>0</p>
								</headphone-left>
							</left-middle>

							<center-middle>
								<browse-knob class='center-middle-class'>
									<p>0</p>
									<browse-button class='center-middle-class'>
										<p>0</p>
									</browse-button>
								</browse-knob>

								<assistant-button class='center-middle-class'>
									<p>0</p>
								</assistant-button>
								<master-knob class='center-middle-class'>
									<p>0</p>
								</master-knob>
								<headphones-knob class='center-middle-class'>
									<p>0</p>
								</headphones-knob>
								<master-button class='center-middle-class'>
									<p>0</p>
								</master-button>
							</center-middle>

							<right-middle>
								<load-right class='left-middle-class'>
									<p>0</p>
								</load-right>
								<gain-right class='left-middle-class'>
									<p>0</p>
								</gain-right>
								<high-right class='left-middle-class'>
									<p>0</p>
								</high-right>
								<low-right class='left-middle-class'>
									<p>0</p>
								</low-right>
								<filter-right class='left-middle-class'>
									<p>0</p>
								</filter-right>
								<headphone-right class='left-middle-class'>
									<p>0</p>
								</headphone-right>
							</right-middle>

							<left-fade class='center-middle-class'>
								<p>0</p>
							</left-fade>
							<cross-fade class='center-middle-class'>
								<p>0</p>
								<beatmatch-button class='center-middle-class'>
									<p>0</p>
								</beatmatch-button>
							</cross-fade>
							<right-fade class='center-middle-class'>
								<p>0</p>
							</right-fade>
					</middle>

			</controller>
		</page>

		<script src="{{asset('/js/Sequencer-Factories/sequencer.js')}}"></script>
		<script src="{{asset('/js/Sequencer-Factories/pitch.js')}}"></script>
		<script src="{{asset('/js/Sequencer-Factories/pulses.js')}}"></script>
		<script src="{{asset('/js/Sequencer-Factories/triggerLights.js')}}"></script>
		<script src="{{asset('/js/Sequencer-Factories/pad-controller.js')}}"></script>
		<script src="{{asset('/js/controller.js')}}"></script>
	</body>
</html>

