const Spinner = ({
                     size = 20,
                     color = 'white',
                     borderSize = 2,
                     speed = 'spin' //spin, spin-slow, spin-fast
                 }) => (
    <div
        className={`animate-${speed} rounded-full border-t-${borderSize} border-b-${borderSize}`}
        style={{
            width: `${size}px`,
            height: `${size}px`,
            borderTopColor: color,
            borderBottomColor: color,
            borderLeft: 'none',
            borderRight: 'none'
        }}
    />
);

export default Spinner;
