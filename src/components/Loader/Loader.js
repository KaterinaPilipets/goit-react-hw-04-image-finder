import { MagnifyingGlass } from 'react-loader-spinner';
import { Сontainer } from 'components/Loader/Loader.styled';
export const Loader = () => {
  return (
    <Сontainer>
      <MagnifyingGlass
        visible={true}
        height="50"
        width="50"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{
          height: '300px',
          width: '300px',
        }}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#3f51b5"
      />
    </Сontainer>
  );
};
