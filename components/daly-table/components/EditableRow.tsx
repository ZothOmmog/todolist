export const EditableRow: React.FC<unknown> = (props) => {
    return (
        <tr {...props} style={{ cursor: 'pointer' }} />
    );
}