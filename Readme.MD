# Hassle Engine

Extremely Work In Progress. Current status: Some basic skeleton classes and a slightly more than a skeleton Input Management class. 

## Project Goals

The objective here is to have a core engine that can run 2d adventure games and a fully self contained editor app and can be used to make games without coding, but then also allow coders to modify the engine to add new mechanics etc. The existing engine stuff I have is not suitable for any of this, so it seems better to at least redo the core part and then backport as much of the useful stuff as possible. 

- Only stuff necessary for 2D adventure games at this time. Just static sprites, animated sprites, background layers, tile maps. Orthagonal camera. 
- Everything should be configurable via data, but with sensible defaults, no hardcoding (input, ui, render pipeline etc, shaders)
- Only one type of entity - Entity - but entities can have components, which allow devs to add functionality/features to entities. A mesh would be an entity component for example. Basically very similiar to how Unity works. Entities also have children, allowing us to build a tree of entities (and greatly simplifying adding game mechanics)
- Transforms ONLY live on the Entity, the entity tree is also the scene graph, rendering any Sprites or Meshes it finds as it goes.
- Ideally all static meshes in a scene should be merged as an obvious render optimisation step (as in the current Hexr engine) 
- Native support for Hassle from the beginning - need to think about what this means.
- Entity I/O or messaging system should exist in some form, but could this be moved to Hassle scripting? (question!)
- A public api for custom Typescript entity components (low priority)
- Runtime support for Hassle (very low priority)

