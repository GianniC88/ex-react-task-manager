import ReactDOM from 'react-dom'

export default function Modal({ title, content, show, onClose,
	onConfirm, confirmText = "Conferma" }) {
	if (!show) return null;

	return ReactDOM.createPortal(
		<div className="container">
			<div className='modal-overlay'>
				<div className='modal'>
					<h2>{title}</h2>
					<p>{content}</p>
					<div className='modal-body'>
						<button onClick={onClose}>Annulla</button>
						<button onClick={onConfirm}>{confirmText}</button>
					</div>
				</div>
			</div>
		</div>,
		document.body
	)

}