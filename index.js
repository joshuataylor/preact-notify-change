import {h, Component} from 'preact';
import style from './style';

export default class NotifyChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newVersion: false
    };

    // Check that service workers are supported, and we aren't prerendered.
    if (typeof window !== "undefined" && 'serviceWorker' in navigator && navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.onstatechange = event => {
        // If there are updates, set the newVersion state to true.
        if (event.target.state === 'redundant') {
          this.setState({newVersion: true});

          // Also notify the parent component that an update has been passed.
          this.props.notifyChange();
        }
      };

      // Check for updates via the updateInterval prop, or every 30 seconds.
      setInterval(function () {
        navigator.serviceWorker.ready.then(function (registration) {
          registration.update();
        });
      }, props.updateInterval || 30000);
    }
  }

  render({}, {newVersion}) {
    if (newVersion !== true) {
      return;
    }
    return (<div class={style.new_version} onClick={() => window.location.reload(true)}>
      A new version has been released, click here to reload the page.
    </div>);
  }
}
