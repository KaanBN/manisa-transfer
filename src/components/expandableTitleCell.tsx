import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";

const ExpandableTitleCell = ({ text } : {text:string}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const needsExpansion = text && text.length > 50;

    if (!needsExpansion) {
        return <div>{text}</div>;
    }

    return (
        <div className="group">
            {isExpanded ? (
                <div className="max-w-xs break-words whitespace-normal">{text}</div>
            ) : (
                <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">{text}</div>
            )}

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-500 hover:text-blue-700 text-xs flex items-center mt-1 focus:outline-none"
            >
                {isExpanded ? (
                    <>
                        <ChevronUp size={14} className="mr-1" />
                        <span>Daralt</span>
                    </>
                ) : (
                    <>
                        <ChevronDown size={14} className="mr-1" />
                        <span>Genişlet</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default ExpandableTitleCell;