import IcoMoon from 'react-icomoon';
const iconSet = require('../assets/fonts/icomoon/selection.json');

const IconProvider = ({ ...props }) => {
  return <IcoMoon iconSet={iconSet} {...props} />;
};

export default IconProvider;
