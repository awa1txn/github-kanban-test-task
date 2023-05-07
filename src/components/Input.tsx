import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { issueListAction } from '../store/issue/issue.slice';

const {Search} = Input;

function InputBox() {
    const dispatch = useDispatch();
    
    const onSearch = (value: string) => {
        // console.log();
        
        dispatch(issueListAction.getIssue(value))
        value = ''
    };
    

    return <div className='search'>
        <Search
        placeholder="Enter repo URL"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        />
    </div>
}

export default InputBox;