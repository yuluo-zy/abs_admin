import SearchList from "@/components/Dynamic/List";
import { SearchItem } from "@/components/type";
import React, {useRef} from "react";


function OrderStorage() {
    const searchListRef = useRef()
    const getColumns = (callback: () => void) => {
        return [

        ]
    }
    const selectItem: Array<SearchItem> = []
    return <SearchList
        name={"实验存储"}
        download={false}
        upload={false}
        ref={searchListRef}
        fetchRemoteData={}
        getColumns={getColumns}
        select={true}
        selectItem={selectItem}
    />
}

export default OrderStorage
