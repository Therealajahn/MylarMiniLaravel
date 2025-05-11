@props(['number'])

<section class='pitch-{{ $number }} pitch-section'>
    <input type='range' class='pitch-{{ $number }} pitch-slider grid-item'/>
    <p class='select-indicator'>0</p>
    <p class='note-indicator'>0</p>
    <trigger-light class='trigger-light-{{ $number }} grid-item'></trigger-light>
    <figure class='octave-{{ $number }} octave-indicator grid-item'>
        @for ($i = 8; $i >= 1; $i--)
            <octave class='{{ $i }} octave grid-item'></octave>
        @endfor
    </figure>
</section> 