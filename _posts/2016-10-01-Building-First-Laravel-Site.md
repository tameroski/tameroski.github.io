--- 
title: '[PHP] Building your first basic Laravel 5 site
layout: post
summary: First steps into Laravel 5 basics
keywords: 'Laravel, PHP, Sass'
---

I'm always looking for an optimized way for building things, specially websites.

composer create-project "laravel/laravel:5.*" laravel-test
cd laravel-test/
php artisan serve &

Template layout
...

route.php in app/Http/

Route::get('/', function () {
    return view('layout');
});
