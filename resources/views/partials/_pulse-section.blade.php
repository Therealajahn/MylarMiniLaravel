@props(['number'])

<section class='pulse-section'>
    <figure class='{{ $number }} pulse-{{ $number }} pulse-indicator grid-item'>
        @for ($i = 8; $i >= 1; $i--)
            <tick class='{{ $i }} tick-{{ $i }} grid-item'></tick>
        @endfor
    </figure>
</section> 