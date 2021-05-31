import {useDispatch} from "react-redux";
import {DownloadButton, RemoveButton} from "../../components/button";
import {downloadOutputFile, removeOutputFile} from "./saga";

export const FileRow = ({fileName}) => {

    const dispatch = useDispatch();

    return <tr>
        <td>{fileName}</td>
        <td>
            <RemoveButton onClick={() => dispatch(removeOutputFile(fileName))} />
            <DownloadButton onClick={() => dispatch(downloadOutputFile(fileName))} />
        </td>
    </tr>
};
