export const PositionsHandler = {

    translateDegsToDirection: (degs) => {
        switch (degs) {
            case 0:
                return "right";
                break;
            case 90:
                return "down";
                break;
            case 180:
                return "left";
                break;
            case 270:
                return "up";
                break;
        }
    },

    translateDirectionToDegs: (direction) => {
        switch (direction) {
            case "up":
                return 270;
                break;
            case "down":
                return 90;
                break;
            case "right":
                return 0;
                break;
            case "left":
                return 180;
                break;
        }
    }

}