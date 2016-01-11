--- 
title: '[Wordpress] Order query results by multiple meta keys'
layout: post
summary: ACF users and other meta keys lovers gonna love this !
keywords: 'Wordpress, WP_Query, Meta_Query, ACF'
---

Ordering things with a Wordpress query is usually quite simple. Let's say you have that good old custom post type called 'Book'. Each book has a meta field for storing its page count, most of the time using [ACF](http://www.advancedcustomfields.com/) in my case. 

Let's say you want to order books by page counts, then by title. You only have to add an 'orderby' parameter to the query :

{% highlight php5 startinline %}
$query-> set('orderby', array(
	'meta_value_num' => 'DESC', 
	'title' => 'ASC',
));
$query-> set('meta_key', 'page_count');
{% endhighlight %}

Now let's add another meta field to 'Books' : i want to store the word count this time. How can we order our books by page count, word count, then title ?
Unfortunately, i figured out the 'meta_key' and 'meta_value_num' parameters are not allowing array values, and you guess that it's not accepting comma separated values either.

I finally came across that [Wordpress Trac entry](https://core.trac.wordpress.org/ticket/31045), just to discover that Wordpress was patched in 4.2 with what will help us here. Finally, you just have to use meta_queries, and give them a key name. Then use these key names in an 'orderby' parameter. Voilà !

{% highlight php startinline %}
$query->set('meta_query', array(
	'page_count' => array(
		'key' => 'page_count',
		'value' => '0',
		'compare' => '>='
	),
	'word_count' => array(
		'key' => 'word_count',
		'value' => '0',
		'compare' => '>='
	),
));
$query-> set('orderby', array(
	'page_count' => 'DESC', 
	'word_count' => 'DESC', 
	'title' => 'ASC',
));
{% endhighlight %}

Too bad this is not documented in the [Codex](http://codex.wordpress.org/Class_Reference/WP_Meta_Query) yet. I might try to add it myself later ;)