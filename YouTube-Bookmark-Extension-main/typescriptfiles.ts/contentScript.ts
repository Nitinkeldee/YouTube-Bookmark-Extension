// (() => {
//   let youtubeLeftControls: HTMLElement | null,
//     youtubePlayer: HTMLVideoElement | undefined;
//   let currentVideo = "";
//   let currentVideoBookmarks: { time: number; desc: string }[] = [];

//   const fetchBookmarks = () => {
//     return new Promise<{ time: number; desc: string }[]>((resolve) => {
//       chrome.storage.sync.get([currentVideo], (obj) => {
//         resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
//       });
//     });
//   };

//   const addNewBookmarkEventHandler = async () => {
//     if (youtubePlayer) {
//       const currentTime = youtubePlayer.currentTime;
//       const newBookmark = {
//         time: currentTime,
//         desc: "Bookmark at " + getTime(currentTime),
//       };

//       currentVideoBookmarks = await fetchBookmarks();

//       chrome.storage.sync.set({
//         [currentVideo]: JSON.stringify(
//           [...currentVideoBookmarks, newBookmark].sort(
//             (a, b) => a.time - b.time
//           )
//         ),
//       });
//     }
//   };

//   const newVideoLoaded = async () => {
//     const bookmarkBtnExists =
//       document.getElementsByClassName("bookmark-btn")[0];

//     currentVideoBookmarks = await fetchBookmarks();

//     if (!bookmarkBtnExists && youtubeLeftControls && youtubePlayer) {
//       const bookmarkBtn = document.createElement("img");

//       bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
//       bookmarkBtn.className = "ytp-button " + "bookmark-btn";
//       bookmarkBtn.title = "Click to bookmark current timestamp";

//       youtubeLeftControls.appendChild(bookmarkBtn);
//       bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
//     }
//   };

//   chrome.runtime.onMessage.addListener((obj, sender, response) => {
//     const { type, value, videoId } = obj;

//     if (type === "NEW") {
//       currentVideo = videoId;
//       newVideoLoaded();
//     } else if (type === "PLAY" && youtubePlayer) {
//       youtubePlayer.currentTime = value;
//     } else if (type === "DELETE") {
//       currentVideoBookmarks = currentVideoBookmarks.filter(
//         (b) => b.time !== value
//       );
//       chrome.storage.sync.set({
//         [currentVideo]: JSON.stringify(currentVideoBookmarks),
//       });

//       response(currentVideoBookmarks);
//     }
//   });

//   const youtubePlayerElement =
//     document.getElementsByClassName("video-stream")[0];
//   if (youtubePlayerElement instanceof HTMLVideoElement) {
//     youtubePlayer = youtubePlayerElement;
//   }

//   const leftControlsElement =
//     document.getElementsByClassName("ytp-left-controls")[0];
//   if (leftControlsElement instanceof HTMLElement) {
//     youtubeLeftControls = leftControlsElement;
//   }

//   newVideoLoaded();
// })();

// const getTime = (t: number): string => {
//   const date = new Date(0);
//   date.setSeconds(t);

//   return date.toISOString().substr(11, 8);
// };
