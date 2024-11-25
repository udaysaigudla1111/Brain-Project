import { atom } from "recoil";

const ModalAtom = atom({

    key:"Modal",
    default:false

})

const ShareModalAtom = atom({
    key:"ShareModal",
    default:false
})

export {ModalAtom,ShareModalAtom}