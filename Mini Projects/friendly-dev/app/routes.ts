import {
  type RouteConfig,
  index,
  route,
  layout,
} from '@react-router/dev/routes';

export default [
  // Layout is used here to apply a specific layout to a certain page, thet first parametner is location of layout and the secound will be the place where you want to use it

  layout('./routes/layout/home.tsx', [index('routes/home/index.tsx')]),

  layout('./routes/layout/main.tsx', [
    route('about', './routes/about/index.tsx'),
    route('contact', './routes/contact/index.tsx'),
    route('projects', './routes/projects/index.tsx'),
    route('projects/:id', './routes/projects/details.tsx'),
    route('blog', './routes/blog/index.tsx'),
  ]),
] satisfies RouteConfig;
