
/*
 |--------------------------------------------------------------------------
 | Laravel Spark - Creating Amazing Experiences.
 |--------------------------------------------------------------------------
 |
 | First, we will load all of the "core" dependencies for Spark which are
 | libraries such as Vue and jQuery. Then, we will load the components
 | which manage the Spark screens such as the user settings screens.
 |
 | Next, we will create the root Vue application for Spark. This'll start
 | the entire application and attach it to the DOM. Of course, you may
 | customize this script as you desire and load your own components.
 |
 */

require('laravel-spark/core/dependencies');

require('./spark/components')

new Vue(require('laravel-spark'));
