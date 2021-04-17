![Node.js CI](https://github.com/theairbend3r/poke-zoo/workflows/Node.js%20CI/badge.svg) [![GitHub license](https://img.shields.io/github/license/theairbend3r/poke-zoo)](https://github.com/theairbend3r/poke-zoo/blob/master/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/theairbend3r/poke-zoo)](https://github.com/theairbend3r/poke-zoo/issues)

# PokeZoo

PokeZoo is webapp that enables users to create their own Pokemon collections by identifying Pokemon from images using deep learning.

![App Flow](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-ml.gif)

You can either create a new username/password or use the following -

username: `test`  
password: `test123`

## Tech Stack

This webapp is hosted on `Heroku`. All features are added using a CI-CD pipeline through `Github`.

- Backend - `Node.js`, `Express.js`
- Frontend - `React.js`, `Emotion.js`, `TailwindCSS`, `Twin.macro`
- Database - `MongoDB`
- Authentication - `JsonWebToken`
- Pokemon Data API - `pokeAPI`
- Deep learning Inference - `Tensorflow.js`
- Deep learning training - `Docker + Tensorflow + Python`

## Application Features

The application features are as follows -

1. Once a user signs-up/logs-in, they will be redirected to the home page that displays their current collection.

2. On the home page, they can create new collections.

3. Once there is at least one collection, Pokemon can be added to it from the explore page.

4. The user can also edit the collection name as well as the Pokemon in it.

5. All collection names have to be unique and duplicate Pokemon are not allowed in the same collection.

6. Images can be used as in input for Pokemon recognition in 2 ways - webcam or upload.

7. The output shows the 6 closest matches for a given Pokemon image.

## Deep Learning

![App Flow](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/pokezoo-mobile-compressed.gif)

PokeZoo has a feature to identify Pokemon from images. It is trained to identify **150** Pokemon. The model used is a pre-trained `Mobilenet` fine-tuned using `Tensorflow` (using `Python` and `Docker`) on a Pokemon images dataset. This model was then converted to `Tensorflow.js` which runs on the browser.

The inference happens on the browser. `WebGL` acceleration is used where available by `Tensorflow.js`.

Here are the performance-metrics for the model.

|              | precision | recall | f1-score | support |
| ------------ | --------- | ------ | -------- | ------- |
| accuracy     |           |        | 0.81     | 1355    |
| macro avg    | 0.82      | 0.81   | 0.80     | 1355    |
| weighted avg | 0.82      | 0.81   | 0.81     | 1355    |

## Screenshots

### Landing Page

![Landing Page](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-landing.jpg)

### Home Page

![Home Page](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-home.png)

### Explore Page

![Explore Page](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-explore.png)

### Find Page

![Find Page](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-find.png)

## Platform Issues

There are some platform issues where the Inference does not run properly on certain combinations of _device + browser + image input type_.

**TLDR;**

Following combinations of _device + browser + image input_ are **working** -

| Device  |   OS    | Browser | Input Method |
| ------- | :-----: | :-----: | :----------: |
| Desktop | Windows | Chrome  |    Webcam    |
| Desktop |  MacOS  | Chrome  |    Webcam    |
| Desktop |  MacOS  | Safari  |    Webcam    |
| Mobile  | Android | Firefox |    Upload    |
| Mobile  | Android | Chrome  |    Webcam    |
| Mobile  |   iOS   | Safari  |    Webcam    |

Following is the report of where it works and where it doesn't along with the behaviour observed.

### Desktop

#### Table

|         |   Ubuntu    |     Windows      |      MacOS       |
| ------- | :---------: | :--------------: | :--------------: |
| Firefox | not working |   not working    |   not working    |
| Chrome  | not working | somewhat working | somewhat working |
| Safari  |     NA      |        NA        | somewhat working |

#### Comments

|         |                                    Ubuntu                                     |                                    Windows                                    |                                     MacOS                                     |
| :-----: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
| Firefox | Predictions are always one step behind for both Captured and Uploaded images. | Predictions are always one step behind for both Captured and Uploaded images. | Predictions are always one step behind for both Captured and Uploaded images. |
| Chrome  | Works only on Captured Images. Uploaded images give same predictions always.  | Works only on Captured Images. Uploaded images give same predictions always.  | Works only on Captured Images. Uploaded images give same predictions always.  |
| Safari  |                                      NA                                       |                                      NA                                       | Works only on Captured Images. Uploaded images give same predictions always.  |

### Mobile

#### Table

|         |     Android      |       iOS        |
| ------- | :--------------: | :--------------: |
| Firefox | somewhat working |   not working    |
| Chrome  | somewhat working |   not working    |
| Safari  |        NA        | somewhat working |

#### Comments

|         | Android                                                                     | iOS                                                                          |
| :-----: | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Firefox | No predictions load for a captured image. Works on uploaded images only.    | Camera does not load. Uploaded images give same predictions always.          |
| Chrome  | Works on capture images only. Uploaded images give same predictions always. | Camera does not load. Uploaded images give same predictions always.          |
| Safari  | NA                                                                          | Works only on Captured Images. Uploaded images give same predictions always. |
