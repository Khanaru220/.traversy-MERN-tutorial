import { deleteGoal } from '../features/goals/goalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaDivide } from 'react-icons/fa';

function GoalItem({ goal, numOrder, isApprovedToLoadHTML }) {
	const dispatch = useDispatch();
	const { userEmail } = useSelector((state) => state.auth);
	const formatLineBrString = goal.text.replace(/\\n/g, '<br>\n');
	const goalTextHTML = isApprovedToLoadHTML ? (
		<h2 dangerouslySetInnerHTML={{ __html: formatLineBrString }} />
	) : (
		<h2>{goal.text}</h2>
	);

	return (
		<div className="goal">
			<div className="goal-content">
				<div className="number">
					{new Date(goal.createdAt).toLocaleString('en-UK')}
				</div>
				<div
					className="number"
					style={{ fontStyle: 'italic', fontSize: '50%' }}
				>
					-{numOrder}-
				</div>
				{/* wala, 1h to find how to convert string_HTML to HTML markup */}
				{goalTextHTML}
				{isApprovedToLoadHTML ? (
					''
				) : (
					<button
						onClick={(e) => {
							dispatch(deleteGoal(goal._id));
							e.target.closest('.goal').classList.add('removed-goal');
						}}
						onMouseEnter={(e) => {
							e.target.closest('.goal').classList.add('close-hover');
						}}
						onMouseLeave={(e) => {
							e.target.closest('.goal').classList.remove('close-hover');
						}}
						className="close"
					>
						X
					</button>
				)}
			</div>
			{/* image only for Harry potter now */}
			{userEmail === 'theboywholived@test.uk' ? (
				<div className="goal-image"></div>
			) : (
				''
			)}
		</div>
	);
}
export default GoalItem;
