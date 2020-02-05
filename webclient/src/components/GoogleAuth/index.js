import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// append Script Element to body
const appendScriptElementToBody = ({ src, async, onload }) => {
  const newScript = document.createElement('script');
  newScript.src = src;
  newScript.async = async | false;
  newScript.onload = onload;

  document.body.appendChild(newScript);
};

function GoogleAuth(props) {
  // onload event of the google api
  const onLoadGoogleApi = () => {
    if (!window.gapi) {
      console.error('Failed to get gapi');
      props.onLoad(null);
    }

    const updateSignInStatus = () => {
      // invoke currentUser to onChangeStatus method
      props.onChangeStatus({
        gCli: window.gapi.auth2.getAuthInstance(),
        data: window.gapi.auth2.getAuthInstance().currentUser.get(),
      });
    };

    const initGoogleClient = () => {
      window.gapi.client
        .init({
          clientId: props.clientId,
          scope: props.scope || 'profile',
        })
        .then(() => {
          if (window.gapi.auth2.getAuthInstance() === null) {
            console.error(
              'Failed to create client. check your props like clientId, scope...'
            );
            props.onLoad(null);
          } else {
            // call props.onload function
            props.onLoad(window.gapi.auth2.getAuthInstance());
            // add event of status
            window.gapi.auth2
              .getAuthInstance()
              .isSignedIn.listen(updateSignInStatus);
            updateSignInStatus(); // initial call
          }
        });
    };

    // load auth2
    window.gapi.load('client:auth2', initGoogleClient);
  };

  useEffect(() => {
    appendScriptElementToBody({
      src: 'https://apis.google.com/js/api.js',
      async: true,
      onload: onLoadGoogleApi,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

GoogleAuth.propTypes = {
  onLoad: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  scope: PropTypes.string,
};

export default memo(GoogleAuth);
