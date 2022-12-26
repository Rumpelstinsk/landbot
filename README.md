# Landbot Frontend Challenge
Some notes about the solution of the challenge:
- Usually, the code with best performance it's not the more readable one. It's part of the engineer job to found a good balance or choose performance over readability on critical code. In this sense, some changes can be made on `graph_utils.js` in favor in one of the topics for example: 
    - In general we could avoid the `Object.values` approach in favor or a simple `for..of`, but I guess the size of the graphs are not big enough to make it critical, and I think it's more readable this way
    - It's the same reason to choose a similar a approach on `hasMultipleSources` instead of choosing a `for..of` on the connections and using an early return the second time we find a connection.
    - `getNodeConnections` could be based on the previous methods, but it would require to go over the graph twice, which would have a penalty.
    -  ...
- I don't have context enough to provide a good folder structure, but probably using `components` as the root folder for `chat` wouldn't be my first approach on a real scenario. I used to go for a folder structure like. 
```
    - components //Folder for shared components
    - scenes // Folder that contains the main containers of the app. Usually each container matches a route
        - [scene or feature name] // Folder that contains the logic on a specific view
            - components // Folder for the components used only in this section
            Scene.jsx // Root file of the scene
```
- The previous folder it's only an example, it would vary depending the real project and needs.
- To work with the messages API there are a bunch of alternatives that would change the approach, where to place the files, etc... In this solution, I'm guessing the API has to be consumed in a bunch of different sections and components, so I went for an approach to use a custom hook to provide the proper functionality to every component that needs to consume the API, and make them agnostic of it's implementation details. 
- In a real scenario I would love to have TS, but I guess it's not part of the challenge, so I didn't take time to configure it. Same for tests.
- Just as a note for the next candidate, the boilerplate you provide to be used as the base of the challenge it's not ready to work with storybook 😅 (despite the recommendation). It requires to include the proper scripts that you define on `public` folder on the Chat story. In this case, to make it simple, I've included them on the `preview-head.html` file of storybook.
- Finally regarding the documentation, there are a bunch of plugins that can be used with TS, that will take care about many of the task to define the proper contracts. Alternatively there are plugins that can be used with PropTypes on plain JS, but because I think neither of both are part of the challenge, I only made a quick sample of documentation, that it's far from being perfect.