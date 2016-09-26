--- 
title: '[PHP] Building your first basic Laravel 5 site
layout: post
summary: First steps into Laravel 5 basics
keywords: 'Laravel, PHP, Sass'
---

I'm always looking for an optimized workflow for building things, specially websites. For static sites, i usually go for a pug/sass starter environnement i made and called [Spuggs](https://github.com/tameroski/Spugss). Very simple but efficient because it bundles everything i need.
But when it comes to introduce a few PHP in a static site, it becomes a little bit more complicated to keep things well organized.

In these cases, i'm still looking for alternatives. [Bolt](http://bolt.cm), a CMS i really love, is one of them, but it's often a bit too much to have a whole backend if i don't really need one. So i was thinking of Silex or Laravel for a long time, and decided to give the latter a try.

What's interesting with Laravel 5 is that it comes with Elexir, a module which deals with preprocessing stuff like Sass (or Less or whatever you want) and Coffeescript. It's based on Gulp, which makes it even more interesting for me as i only worked with Grunt up to now.

So let's dig into making a simple site using all this.

# Installation

First let's create the 'laravel-test' project using composer :

```
composer create-project "laravel/laravel:5.*" laravel-test
cd laravel-test/
```

There you'll see a quite standard MVC app directory tree. Routing stuff and controllers goes into the Http/ folder, while views are located in the resources/views/.

Now let's run the server :

`php artisan serve`

When browsing at localhost:8000/ (the default host and port) you should have a page like this : 

![Laravel starting screen](/assets/images/posts/starting-screen.png)

Next, we'll install the laravel-elixir-pug package so we can work our templates with Pug (formerly known as Jade). By the time i'm writing, you'll need to have the latest version of npm to do so (because of a peer dependency issue with pug@2.0.0 still in beta version). 

`npm install npm -g`

Of course, you'll have to install Pug globally first if it's not already done. Same for Gulp.

`npm install pug gulp -g`

Then you're good to go with laravel-elixir-pug for your local project : 

`npm install --save laravel-elixir-pug pug`

And don't forget to install Elixir's node dependencies :

`npm install`

Finally, in the project's gulp file (gulpfile.js), add the laravel-elixir-pug dependency at the top and its settings in the mix section like this : 

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

We're now ready to write our pug template files in the resources/assets/pug/ directory. They'll be automatically compiled into blade files (Laravel template files) in resources/views/ along with the sass files.

Let's run Elixir's gulp task and go on :

`gulp watch`

Oh, and simply add the production parameter if you want minified assets in the end : 

`gulp watch --production`

# Templates & routing

Now we need to build a generic layout template for our website's pages. Let's create a layout.pug file in our new resources/assets/pug folder :

```
html
	head
		title My Laravel Site

		link(rel="stylesheet" href="css/app.css")

	body
		//- Menu
		nav
			ul
				li
					a(href="{{ URL::route('home') }}") Home
				li
					a(href="{{ URL::route('contact') }}") Contact

		//- Main content
		main @yield('content')
```

If you're familiar with Pug, no big surprise here, except maybe for the last line. The 'yield' directive tells Laravel to replace a portion of content (called section) in a template.

As you can see, there are 2 links in the menu, each one having its own named route. So now let's create these routes. In app/Http/routes.php, replace the default welcome route by : 

```
Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/contact', function () {
    return view('contact');
})->name('contact');
```

Last but not least, let's create 2 templates for those routes, each one extending our generic layout template. Here is the 'home' template code for exemple : 

```
|@extends("layout") {{-- This template is extending the "layout" one --}}
|@section("content") {{-- This section will replace the yield('content') --}}
h1 Laravel test site
p Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pellentesque posuere nunc, at laoreet augue. Donec ultricies eu mi sit amet dictum. Maecenas ut posuere ligula. Donec ut mauris vitae orci faucibus suscipit ac et dui. Quisque sed massa non tortor euismod accumsan.
|@stop {{-- End of the section --}}
```

Note that the '|' is here for telling Pug to keep a line as is. 

Create another template of the same kind for the contact page for now, and add some Sass magic to check that everything's is OK with gulp : 

```
$color: #BADA55;
$width: 960px;

@mixin boxed {
	width:$width;
	margin:0 auto;
}

body{
	font-family: Helvetica, Arial, Sans-serif;
	background: $color;
}

h1{
	text-transform: uppercase;
}

nav{
	@include boxed;

	ul{
		padding:0;
		margin:0;
		list-style:none;

		li{
			display:inline-block;
		}
	}
}

main{
	@include boxed;
}
```

Voilà ! You should see something like this in your browser now : 

![Voilà!](/assets/images/posts/voila.png)
