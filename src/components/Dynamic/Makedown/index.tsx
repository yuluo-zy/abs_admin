// import React from "react";
// import {
//   createBasicElementsPlugin,
//   createExitBreakPlugin,
//   createPlateUI,
//   createResetNodePlugin,
//   createSoftBreakPlugin,
//   Plate
// } from "@udecode/plate";
// import { Toolbar } from "@/components/Dynamic/Makedown/components/Toolbar";
// import { BasicElementToolbarButtons } from "@/components/Dynamic/Makedown/components/BasicElementToolbarButtons";
// import { createMyPlugins } from "@/components/Dynamic/Makedown/components/plateTypes";
// import { resetBlockTypePlugin } from "@/components/Dynamic/Makedown/components/resetBlockTypePlugin";
// import { softBreakPlugin } from "@/components/Dynamic/Makedown/components/softBreakPlugin";
// import { exitBreakPlugin } from "@/components/Dynamic/Makedown/components/exitBreakPlugin";
// import { editableProps } from "@/components/Dynamic/Makedown/components/editableProps";
//
// const plugins = createMyPlugins(
//   [
//     createBasicElementsPlugin(),
//     createResetNodePlugin(resetBlockTypePlugin),
//     createSoftBreakPlugin(softBreakPlugin),
//     createExitBreakPlugin(exitBreakPlugin),
//   ],
//   {
//     components: createPlateUI(),
//   }
// );
//
//
// export function MakeDown(props: { theme: boolean, onRef? }) {
//
//
//
//   return (
//     <div>
//       <Toolbar>
//         <BasicElementToolbarButtons />
//       </Toolbar>
//       <Plate
//         editableProps={editableProps}
//         plugins={plugins}/>
//     </div>
//
//   );
// }
