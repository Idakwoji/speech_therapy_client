/* eslint-disable react/prop-types */
import { Divider } from 'antd';
import BlockSlideShow from './BlockSlideShow';
import SearchBar from './SearchBar';

const SearchPane = ({ blockCount, currentBlock, setCurrentBlock }) => {
    return (
        <div>
            <BlockSlideShow blockCount={blockCount} currentBlock={currentBlock} setCurrentBlock={setCurrentBlock} />
            <SearchBar />
            <Divider />
            <div className="h-[10%]">
                <div className="px-4 py-4 rounded-lg min-w-28 max-w-44 h-fit bg-gradient-to-br from-blue-300 to-blue-700">

                </div>
            </div>
        </div>
    )
}

export default SearchPane