<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class ViewServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        Blade::component('partials.pitch-section', 'pitch-section');
        Blade::component('partials.pulse-section', 'pulse-section');
    }
} 