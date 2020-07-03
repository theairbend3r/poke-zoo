![Node.js CI](https://github.com/theairbend3r/poke-zoo/workflows/Node.js%20CI/badge.svg) [![GitHub license](https://img.shields.io/github/license/theairbend3r/poke-zoo)](https://github.com/theairbend3r/poke-zoo/blob/master/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/theairbend3r/poke-zoo)](https://github.com/theairbend3r/poke-zoo/issues)

# PokeZoo

PokeZoo is webapp that enables users to create their own Pokemon collections by identifying Pokemon from images using deep learning.

![App Flow](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-ml.gif)

## Tech Stack

This webapp is hosted on `Heroku` using a CI-CD pipeline thorugh `Github`.

- Backend - `Node.js`, `Express.js`
- Frontend - `React.js`, `Emotion.js`, `TailwindCSS`, `Twin.macro`
- Database - `MongoDB`
- Authentication - `JsonWebToken`
- Data API - `pokeAPI`
- Deep learning Inference - `Tensorflow.js`
- Deep learning training - `Docker + Tensorflow`

## Deep Learning

PokeZoo has a feature to identify Pokemon from images. It is trained to identify **150** Pokemon. The model used is a pre-trained `Mobilenet` fine-tuned using `Tensorflow` (using `Python` and `Docker`) on a Pokemon images dataset. This model was then converted to `Tensorflow.js` which runs on the browser.

Deep learning inference happens on the browser.

|              | precision | recall | f1-score | support |
| ------------ | --------- | ------ | -------- | ------- |
| accuracy     |           |        | 0.81     | 1355    |
| macro avg    | 0.82      | 0.81   | 0.80     | 1355    |
| weighted avg | 0.82      | 0.81   | 0.81     | 1355    |

There are some platform issues where the Inference does not run properly on certain combinations of device + browser + image input type.

Here's an in-depth report of where it works.

**TLDR;**

Following combinations of device + browser + image input are working -

| Device  |   OS    | Browser | Input Method |
| ------- | :-----: | :-----: | :----------: |
| Desktop | Windows | Chrome  |    Webcam    |
| Desktop |  MacOS  | Chrome  |    Webcam    |
| Desktop |  MacOS  | Safari  |    Webcam    |
| Mobile  | Android | Firefox |    Upload    |
| Mobile  | Android | Chrome  |    Webcam    |
| Mobile  |   iOS   | Safari  |    Webcam    |

### Desktop

#### Table

|         |   Ubuntu    |     Windows      |      MacOS       |
| ------- | :---------: | :--------------: | :--------------: |
| Firefox | not working |   not working    |   not working    |
| Chrome  | not working | somewhat working | somewhat working |
| Safari  |     NA      |        NA        | somewhat working |

#### Comments

|         |                                    Ubuntu                                    |                                   Windows                                    |                                    MacOS                                     |     |
| ------- | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | --- |
| Firefox | Predictions are always one step behin for both Captured and Uploaded images. | Predictions are always one step behin for both Captured and Uploaded images. | Predictions are always one step behin for both Captured and Uploaded images. |     |
| Chrome  | Works only on Captured Images. Uploaded images give same predictions always. | Works only on Captured Images. Uploaded images give same predictions always. |                        Works only on Captured Images.                        |     |
| Safari  |                                      NA                                      |                                      NA                                      |                        Works only on Captured Images.                        |     |

### Mobile

#### Table

|         |     Android      |       iOS        |
| ------- | :--------------: | :--------------: |
| Firefox | somewhat working |   not working    |
| Chrome  | somewhat working |   not working    |
| Safari  |        NA        | somewhat working |

#### Comments

|         |                                   Android                                   |                                     iOS                                      |     |
| ------- | :-------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :-: |
| Firefox |  No predictions load for a captured image. Works on uploaded images only.   |     Camera does not load. Uploaded images give same predictions always.      |     |
| Chrome  | Works on capture images only. Uploaded images give same predictions always. |     Camera does not load. Uploaded images give same predictions always.      |     |
| Safari  |                                     NA                                      | Works only on Captured Images. Uploaded images give same predictions always. |     |

## Screenshots

### Landing Page

![Landing Page](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-landing.jpg)

### Home Page

![Home Page](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-home.png)

### Explore Page

![Explore Page](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-explore.png)

### Find Page

![Find Page](https://raw.githubusercontent.com/theairbend3r/poke-zoo/master/screenshots/poke-zoo-find.png)

## App Flow

The app-flow is as follows -

1. Once a user signs-up/logs-in, they will be redirected to the home page that displays their current collection.

2. On the home page, they can create new collections.

3. Once there is at least one collection, Pokemon can be added to it from the explore page.

4. The user can also edit the collection name as well as the Pokemon in it.

5. All collection names have to be unique.

6. Duplicate Pokemon are not allowed in the same collection.
