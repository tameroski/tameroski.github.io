--- 
title: '[PHP] Building your first basic Laravel 5 site
layout: post
summary: First steps into Laravel 5 basics
keywords: 'Laravel, PHP, Sass'
---

I'm always looking for an optimized way for building things, specially websites. For static sites, i usually go for a pug/sass starter environnement i made and called [Spuggs](https://github.com/tameroski/Spugss). Very simple but efficient because it bundles everything i like and compiles it using grunt.
But when it comes to introduce a few PHP in a static site, like it's often the case (newsletter registering, contact sending, ...) it becomes a little bit more complicated. All of a sudden, i run into a lot of boring things to do : 

* linking javascripts and php files through AJAX
* securizing those links
* importing PHP libraries as i need them

So for those cases, i was still looking for alternatives. Bolt, a CMS i really love, was one of them, but it's a bit too much to have a whole backend if i don't really need one. So i was thinking of Sylex or Laravel for a long time for all this, and finally decided to give the latter a try.

composer create-project "laravel/laravel:5.*" laravel-test
cd laravel-test/
php artisan serve &

Template layout
...

route.php in app/Http/

Route::get('/', function () {
    return view('layout');
});
