# CyberGraph

![`CyberGraph`](/public/CyberGraph-screenshot.jpg)

<!-- <img align="center" width="900" height="450" src="./public/CyberGraph-screenshot.jpg"> -->

## [`Live Site`](https://cyber-graph.vercel.app/)

## About this project

CyberGraph is a 3D-graph based, user based social connection explorer. It has some cool features like 3d node graph, dynamic loading bar, immersive user experience, cyber mode(10-hops friendship network display) and focus mode(aggregated connection display).

This project is inspired from Gitcoin [Scheduling Point Virtual Hackathon](https://gitcoin.co/issue/cyberconnecthq/explorer-and-cyberconnected-dapps/1/100027517) contest submissions which is making a social explorer with cyberconnect on Web3.

<br>

## Technologies We Used

-   [`Next.js`](https://nextjs.org/)
    <br>
-   [`TypeScript `](https://www.typescriptlang.org/)
    <br>
-   [`MUI library`](https://mui.com/)
    <br>
-   [`Cyber Connect`](https://docs.cyberconnect.me/)
    <br>
-   [`Apollo Client`](https://www.apollographql.com/docs/)
    <br>
-   [`3D Force-Directed Graph`](https://github.com/vasturiano/3d-force-graph)

<br>

## About Gitcoin Hackathon

CyberGraph is still well under improvement with many features in the pipeline. This is a perfect scenario for the whole community to join us and BUIDL together. Please see more information on Gitcoin [Grants Round 13 Hackathon CyberConnect Task 1](https://gitcoin.co/issue/cyberconnecthq/gitcoin-gr13-hackathon/1/)

<br>

We invite the community to experiment with it and add innovative features or make constructive product suggestions. A few examples that sprung to our mind: adding node visual effects to make it easier to read user info; differentiating connection & nodes visually, maybe on the basis of connection types, connection quantity, etc, and in terms of color, brightness, distance, etc; enabling continuous exploration where users can track their path of connections; adding subgroups; enabling exploring the connections between two queried nodes; optimizing graph filtering and visualization so to balance between UX and informative efficiency.

### Sub-tasks

-   POAP Fetching & NFT Fetching
-   Following & Follower List Display
-   Innovative Features & Product Suggestions (Like adding node visual effects features to make it easier to read user information)

Welcome to discuss and learn in our discord Hackathon channel and make your submission. CyberConnect team welcomes anyone who wants to join Web3 world and is happy to transfer development knowledge.

Participants from Gitcoin SPVH hackathon and other contributors please contact brucew@cybertinolab.com to append to the list. We are looking forward to more people's participation!

<br>

## Run the App

Set the following variables in `.env`

-   `NEXT_PUBLIC_MORALIS_SERVER_URL = `[`Moralis Server URL`](https://docs.moralis.io/moralis-dapp/connect-the-sdk/connect-with-reacts)
-   `NEXT_PUBLIC_MORALIS_APP_ID = `[`Moralis App ID`](https://docs.moralis.io/moralis-dapp/connect-the-sdk/connect-with-reacts)

Then run:

```
yarn install

yarn run dev
```

Open the browser, open [Localhost](https://localhost:3000/) and you will see the UI of the project.

<!-- ## ✨Contribution

CyberGraph is an open-source, community-driven project, with co-authors and contributors from CyberConnect dev team and community.

Lists are in **no particular order**. All co-authors & contributors work together and share the credits.

**Co-Authors**

| Co-Authors                                                                                                                      | Description                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="https://github.com/WildSaoFeng"><img width="120" src="https://avatars.githubusercontent.com/u/24604477?s=96&v=4" ></a> | WildSaoFeng: Initiated the project, set up tech framework, worked on MetaVerse building, the 3d-model generation, graph building, connection data fetching & processing, dynamic loading bar, two-mode proposer and implementer |
| <a href="https://github.com/BruceWangyq"><img width="120" src="https://avatars.githubusercontent.com/u/88688323?v=4" ></a>      | Bruce: Created page layout and UI components like User Panel, Navbar, Search Bar, Wallet Connect Button. Data fetching through different components. Researched and set up the 3d-Graph library.                                |
| <a href="https://www.behance.net/wanghanyang"><img width="120" src="https://i.ibb.co/HxmvMJc/newUI.jpg"></a>                    | Hanyang: A talent and pushy UI designer and PM, who designed the product and insisted on using 3D display, so we can have this current version of product                                                                       |
| <a href="https://github.com/jiayi1992"><img width="120" src="https://avatars.githubusercontent.com/u/17503721?v=4"></a>         | Jiayi: Fix issues and give detailed and patient instructions to other co-authors                                                                                                                                                |

**Contributors**

| Contributors                                                                                                                                                                             | Description                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| <a href="https://github.com/sThReal"><img width="80" src="https://avatars.githubusercontent.com/u/7857661?v=4"></a>                                                                      | HappySean: Providing frontend tech support                          |
| <a href="https://github.com/akasuv"><img width="80" src="https://avatars.githubusercontent.com/u/30253166?v=4"></a>                                                                      | SUV: Providing frontend tech support                                |
| <a href="https://github.com/Neo697"><img width="80" src="https://avatars.githubusercontent.com/u/57715245?v=4"></a>                                                                      | Yaoxuan: Providing frontend tech support                            |
| <a href="https://github.com/gio-XD"><img width="80" src="https://avatars.githubusercontent.com/u/31834881?v=4"></a>                                                                      | Gio: Providing frontend tech support                                |
| <img width="80" src="https://media-exp1.licdn.com/dms/image/C4D0BAQGXpWlyiCcCnA/company-logo_100_100/0/1637107512709?e=1654732800&v=beta&t=zuQHFq3S_WXDLPxzfggzracq95E9caueEyOjnuuNDCM"> | Wilson: Providing guide & product feedback                          |
| <a href="https://github.com/ryanli-me"><img width="80" src="https://avatars.githubusercontent.com/u/5056640?v=4"></a>                                                                    | Ryan: Providing guide & product feedback                            |
| <a href="https://github.com/spadequeen7"><img width="80" src="https://avatars.githubusercontent.com/u/6890089?v=4"></a>                                                                  | SpadeQueen7: Providing guide & product feedback                     |
| <a href="https://github.com/ZhimaoL"><img width="80" src="https://avatars.githubusercontent.com/u/21219146?v=4"></a>                                                                     | Zhimao: Providing guide & product feedback                          |
| <a href="https://github.com/yilan-huang"><img width="80" src="https://avatars.githubusercontent.com/u/96097790?v=4"></a>                                                                 | Yilan: Providing professional proofreading help                     |
| <a href="https://www.linkedin.com/in/wzhu81"><img width="80" src="https://i.ibb.co/R9jqbzb/2022-03-11-09-28-07.jpg"> </a>                                                                | Wenyi: Providing professional proofreading help                     |
| <a href="https://github.com/HaoPeiwen"><img width="80" height="80" src="https://avatars.githubusercontent.com/u/44077572?v=4"></a>                                                       | Peiwen: Providing indexer tech support                              |
| <a href="https://github.com/cc-fruit"><img width="80" src="https://avatars.githubusercontent.com/u/89375075?v=4"></a>                                                                    | CC_Fruit: Providing indexer tech support                            |
| <a href="https://github.com/cyberconnecthq"><img width="80" src="https://avatars.githubusercontent.com/u/81209593?s=200&v=4"></a>                                                        | All CyberConnect Teams & Community: providing all kinds of supports | -->

## Follow Us

-   [Twitter](https://twitter.com/CyberConnectHQ)
-   [Discord](https://discord.com/invite/bYJ3cB7bbC)
-   [Website](https://cyberconnect.me/)
