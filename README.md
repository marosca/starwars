# MaroscaStartWars

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Projects structure and information about CACHING data

In order to get better performance, this projects has been structured with lazy modules. In adition has been cached all requests data content from swapi api in a redux store, to avoid making requests during internal browsing. When user landing, page has to get information for server. While you are browsing everything is saved in the store and in subsequent navigations the server information is not needed

**To improve core web vitals (CLS, LCP...), SEO and user experience when landing in web, I recommend to use SSR rendering with angular universal for renderings with a memory caching system like redis or somethin similar. This has not been implemented in this example, but would be highly recommended for this type of project.**

![Toolbar](https://raw.github.com/marosca/starwars/master/picture.jpg)
