# apple-tv-parallax

[![Dependency Status](https://david-dm.org/dreamsparkx/apple-tv-parallax.svg)](https://david-dm.org/dreamsparkx/apple-tv-parallax) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdreamsparkx%2Fapple-tv-parallax.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdreamsparkx%2Fapple-tv-parallax?ref=badge_shield)
 [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) ![Apple TV Parallax](https://github.com/dreamsparkx/apple-tv-parallax/workflows/Apple%20TV%20Parallax/badge.svg) ![npm](https://img.shields.io/npm/v/@dreamsparkx/parallax/latest.svg)

<!-- [![CircleCI](https://circleci.com/gh/dreamsparkx/apple-tv-parallax.svg?style=svg)](https://circleci.com/gh/dreamsparkx/apple-tv-parallax) -->
Live Demo: https://dreamsparkx.github.io/apple-tv-parallax/

## Install
`npm i @dreamsparkx/parallax`

## API

| Step              | Description                                                                                                                     |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------|
| layers            | The images will be stacked on top of each other and the last element/image will be at the top.                                                                          |
| isStatic          | When you pass `true`, it disables the parallex effect, and shows the flattened image instead. (optional) |
| style             | Pass on css properties (optional)                                                |
| className         | Pass on className (optional).                                                                                                  |


## Example

``` javascript
import { Parallax } from '@dreamsparkx/parallax';

<Parallex
  layers={[
    '/assets/images/back.png',
    '/assets/images/front.png',
  ]}
  isStatic={false}
  style={{ flex: 0.21, height: 100, textAlign: 'center' }}
/>
```

![](https://raw.githubusercontent.com/dreamsparkx/apple-tv-parallax/master/extra/gifs/example.gif)


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdreamsparkx%2Fapple-tv-parallax.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdreamsparkx%2Fapple-tv-parallax?ref=badge_large)