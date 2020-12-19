export function requireCouchImageSwitch(instructorImg: string) {
    let requireFilePath: any
    switch (true) {
        case instructorImg === "niv.jpg":
            requireFilePath = require('../assets/couch-profile-imgs/niv.jpg');
            break;
    }
    return requireFilePath
} 