//file to use valtio
import {proxy} from 'valtio';

const state = proxy({
    intro: true,//are we currently in home page or not
    color: "#efbd48",
    isLogoTexture: true,//to set logo on tshirt
    isFullTexture: false,//to set logo pattern on whole tshirt
    logoDecal: './threejs.png',
    fullDecal: './threejs.png',
});

export default state;