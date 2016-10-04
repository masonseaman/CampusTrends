/**
 * Created by Mason Seaman on 10/3/16.
 */
var HelloMessage = React.createClass({
   render:function(){
       return <div>Hello {this.props.name}</div>;
   }
});

ReactDOM.render(<HelloMessage name="Mason" />,document.getElementById(''))
