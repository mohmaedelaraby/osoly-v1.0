import { apiUrl } from "../../utils/exportEnvUrls";
import api from "../axiosInstance/api";

export const uploadImage = (file) => {
    const formData = new FormData();
    if (file.name) {
        formData.append("Files[]", file, file.name);
    } else {
        formData.append(
            "Files[]",
            file,
            Math.floor(Math.random() * 1000).toString() + ".png"
        );
    }
    //return api.post(`${apiUrl}/Common/Image`, formData)
}