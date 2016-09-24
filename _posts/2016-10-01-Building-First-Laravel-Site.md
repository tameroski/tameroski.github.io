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
* importing PHP libraries the old way as i need them

So for those cases, i was still looking for alternatives. [Bolt](http://bolt.cm), a CMS i really love, was one of them, but it's often a bit too much to have a whole backend if i don't really need one. So i was thinking of Sylex or Laravel for a long time, and finally decided to give the latter a try.

What's intersting with Laravel 5 is that it comes with Elexir, a module which deals with preprocessing stuff like Sass (or Less or whatever you want) and Coffeescript. It's based on Gulp, which makes it even more interesting for me as i only worked with Grunt up to now.

So let's dig into making a simple site using all this.

# Installation

First let's create the 'laravel-test' project using composer :

```
composer create-project "laravel/laravel:5.*" laravel-test
cd laravel-test/
```

There you'll see a quite standard MVC app directory tree. Routing stuff and controllers goes into the Http/ folder, while views are located in the resources/views/.

Now let's run the server :

`php artisan serve &`

When browsing at localhost:8000/ (the default host and port) you should have a page like this : 

![Laravel starting screen](/assets/images/posts/starting-screen.png)

Next, we'll install the laravel-elixir-pug package so we can work our templates with Pug (formerly known as Jade). By the time i'm writing, you'll need to have the latest version of npm to do so (because of a peer dependency issue with pug@2.0.0 still in beta version). 

`npm install npm -g`

Of course, you'll have to install Pug globally first if it's not already done. Same for Gulp.

`npm install pug gulp -g`

Then you're good to go with laravel-elixir-pug for your local project : 

`npm install --save laravel-elixir-pug pug`

Now in the project's gulp file (gulpfile.js), add the package dependency at the top and it's settings in the mix section like this : 

```
require('laravel-elixir-pug');

elixir(function(mix) {
    mix
	    .sass('app.scss')
	    .pug({
            blade: true,
            pretty: true,
            src: 'resources/assets/pug/',
            search: '**/*.pug',
            dest: 'resources/views'
	    });
});
```

We're now ready to write our pug template files in the resources/assets/pug/ directory. They'll be compiled into blade files (Laravel template files) in resources/views/.

Let's run Elixir's gulp task and go on :

`gulp watch`

Oh, and simply add the production parameter if you want minified assets in the end : 

`gulp watch --production`

# Templates & routing

Now we need to build our a generic layout template for our website's pages. Let's create a layout.pug file in our new resources/assets/pug folder with this content :

Template layout
...

route.php in app/Http/

Route::get('/', function () {
    return view('layout');
});
