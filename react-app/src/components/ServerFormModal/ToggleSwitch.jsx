import "./ToggleSwitch.css"

const ToggleSwitch = ({label, setState, state}) => {
	return <div className="toggleSwitchRow">
		<div className="toggleSwitchLabel">{label}</div>
		<div
			className="toggleSwitchWrap"
			data-checked={state?'1':'0'}
			onClick={() => {
				setState(e=>!e)
			}}
		>
			<div className="toggleSwitchInner"></div>
		</div>
	</div>
}
export default ToggleSwitch