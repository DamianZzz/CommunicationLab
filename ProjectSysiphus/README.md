# Loop of Sisyphus

**By Damian Zhang**

## Subtitle

An interactive web adaptation about repetition, scale, and changing perception.

## Short Description

*Loop of Sisyphus* is a linear interactive web narrative that expands the myth of Sisyphus into cycles of labor, life, seasons, and human routine. Through dragging, hovering, scrolling, typing, and clicking, the project asks whether repetition can gain meaning when our way of seeing changes.

## Abstract

*Loop of Sisyphus* begins with the myth of Sisyphus, but it does not simply retell the story of a man pushing a stone forever. Instead, the project uses the myth as a starting point to explore repetition across different scales: a stone, microorganisms, a leaf, a tree, seasonal change, and human digital labor. Each scene translates repetition into a different web interaction, including dragging, hovering, scrolling, typing, and clicking. And for the viewers, they don't only watch the loops, but perform it through the browser. As the story moves from myth to nature to work and back again, the project suggests that the loop may never fully disappear. What can change is the way we see it. A single leaf, a shift in attention, or a new perspective may be enough to turn repetition into landscape.

## Image

![Stone scene](images/first-scene.png)
*The first scene turns dragging into repetitive uphill labor.*


## How to View

Open the hosted GitHub Pages:https://damianzzz.github.io/CommunicationLab/ProjectSysiphus/ and begin from the starting page.




# Documentation

## 1. Process: Design and Composition

The main idea of my project is that life is full of repeated loops. Sisyphus repeats his labor. Microbes repeat themselves through reproduction. The tree repeats through the seasons. Human life also repeats through daily work and digital tasks. The loop may not disappear, but the way we look at it can change. I wanted the project to suggest that meaning does not always come from escaping the loop. Sometimes it comes from noticing small things inside it, like a single leaf.


Each page uses one main interaction we learned in class. The stone page uses dragging. The microbe page uses hovering. The tree page uses scrolling. The human page uses typing and clicking. I wanted each interaction to become part of the story, not just an extra effect.

The first scene was inspired by a project shown in class where the user could drag to move through a world and discover the story. That gave me the idea to make Sisyphus move not by actually moving the figure, but by moving the background behind him. The user feels like they are pushing forward, but the action is still repetitive.

The microbe page was inspired by a previous project by my classmate Yukuan. In that project, cells moved and reproduced on the screen. I thought that idea was very strong, and it fit my project because cell movement and reproduction could show another kind of loop. I changed the idea so that the user does not fight or win. The microbes simply move and multiply when the user hovers.

The human work page also connects to my previous Shanzhai Web project. In that project, I learned how imitation and layout can create meaning. For this page, I made a fake VS Code interface. It is not a real code editor, but it copies the visual language of one. The user fills empty spaces in code, but the content does not really matter. This creates a small routine of digital work. After that, leaves appear on the screen, bringing the natural world back into the human work space.

## 2. Process: Technical

The project is organized as several linked HTML pages. Each page is one scene in the story. The pages are linear, so the user moves from one scene to the next through links.

The main pages are:

- `index.html`: the starting page
- `scene1.html`: the stone scene
- `microbe.html`: the microbe scene
- `tree.html`: the tree and seasons scene
- `human.html`: the fake coding work scene
- `ending.html`: the final return to the stone

Each page has its own CSS and JavaScript file. I chose this structure because each scene has different interactions and visual needs. It also made the code easier to manage.

For CSS, I used layers a lot. Many scenes are built from separate foreground, background, and effect layers. This was especially important in the stone scene and the tree scene. I used `position: absolute`, `z-index`, `transform`, `opacity`, `filter`, and `transition` to create movement and atmosphere. I also used different visual styles for different scenes, but I tried to keep a consistent poetic and handmade feeling across the project. For example, the tree scene uses a fixed background image with seasonal effects placed on top. Instead of drawing every leaf separately, I used blurred color layers to create a more impressionistic feeling. The scroll controls opacity, snow, and the movement of the highlighted leaf.

## 3. Technical Challenge: Endless Uphill Movement

The main technical challenge was the first scene. I wanted the stone and the human figure to stay almost fixed in the center of the screen, while the mountain path moved behind them. This creates the illusion that the user is pushing the stone uphill.

The problem was that one background image cannot move forever. If it moves too far, it leaves the screen. If it resets, the viewer can see a sudden jump. I needed the movement to feel continuous and diagonal.

I solved this by separating the scene into layers. The stone and figure are in the fixed foreground. The mountain path is in a moving layer behind them. I placed several copies of the same path image along the same diagonal line.

In JavaScript, the user’s drag distance becomes both horizontal and vertical movement:

```js
let progress = distance % loopLength;

let trackX = -progress;
let trackY = progress * 0.36;

trackWorld.style.transform =
  "translate(" + trackX + "px, " + trackY + "px)";
```
The trackX value moves the path left. The trackY value moves it downward at a fixed ratio. Since the figure and stone are fixed, this makes it look like they are moving uphill.

I used the modulo operator here:

```js
let progress = distance % loopLength;
```
This makes the movement loop after a certain distance. To hide the reset, I placed the repeated path images using the same diagonal ratio. For example, if the next image moves 1400px to the right, it also moves upward by the matching y-value. This way, when one image leaves, the next one is already in the correct position.



## 4. Reflection and Future Development

One important thing I learned from this project is that fixed pixel values can cause problems on different screens. During testing, some elements looked correct on my own screen but shifted or appeared in the wrong place on another display. In the future, I would use fewer fixed `px` values and rely more on relative units like `vw`, `vh`, and percentages, so the layout can adapt better to different screen sizes.

Another issue I want to improve is image loading. This project uses many PNG and JPG files, and large image files can slow down the page or make the transition between scenes less smooth. If I continue developing this project, I would compress the images, reduce unnecessary file sizes, and preload important assets to make the experience more stable.

## 5. Credits

Yukuan's project: https://github.com/gykkkkk-112/CommLab/tree/0652f37a86d8af67a791a34fe3d889b670352c14/bacterium

