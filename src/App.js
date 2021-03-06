import React from 'react';

import Link from './components/Link';
import Route from './components/Route';

const Home = () => (
  <h2>Home</h2>
);

const About = () => (
  <h2>About</h2>
);

const Topic = ({ topicId }) => (
  <h3>{topicId}</h3>
);

const Topics = ({ match }) => {
  const items = [
    { name: 'Rendering with React', slug: 'rendering' },
    { name: 'Components', slug: 'components' },
    { name: 'Props v. State', slug: 'props-v-state' }
  ];

  return (
    <div>
      <h2>Topics</h2>
      <ul>
        {items.map(({ name, slug }, index) => (
          <li key={index}>
            <Link to={`${match.url}/${slug}`}>{name}</Link>
          </li>
        ))}
      </ul>
      {items.map(({ name, slug }) => (
        <Route key={name} path={`${match.url}/${slug}`} render={() => (
          <Topic topicId={name} />
        )} />
      ))}
      <Route exact path={match.url} render={() => (
        <h3>Please, select a topic.</h3>
      )} />
    </div>
  );
};

/**
 * - Route components render a UI whenever the current URL match the given **path** prop.
 * - Link provides a declarative, accessible way to navigate around the app, allowing
 *   users to update the URL.
 */

function App() {
  return (
    <div>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/topics'>Topics</Link></li>
      </ul>

      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/topics' component={Topics} />
    </div>
  );
}

export default App;
