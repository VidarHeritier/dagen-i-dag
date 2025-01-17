type ButtonId = "button1" | "button2" | "button3";

export const getNewContent = (buttonId: ButtonId): string => {
  switch (buttonId) {
    case "button1":
      return "Content for button 1";
    case "button2":
      return "Content for button 2";
    case "button3":
      return "Content for button 3";
    default:
      return "Default content";
  }
};
