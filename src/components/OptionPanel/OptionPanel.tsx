import { useState, useCallback, useEffect, memo } from "react"
import type { OptionPanelProps, LineType } from "../../types/types"
import './OptionPanel.scss'
import { useTheme } from "../../contexts/ThemeContext";

const ArrowIcon = ({ isReversed }: { isReversed: boolean }) => (
    <svg className={isReversed ? "arrow reversed" : "arrow"} width="14.003" height="6.998" viewBox="0 0 14.003 6.998" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99758 6.9981L0 0.691349L0.536532 0.000148296L6.99789 5.89066L13.4668 0L14.003 0.691497L6.99758 6.9981Z" fill="#5E5D67" fill-rule="evenodd" />
    </svg>
);

const OptionPanel = memo(({ changeVariations, changeLine, changeIsDay, variations}: OptionPanelProps) => {
    const [isVariatonMenu, setIsVariationMenu] = useState(false)
    const [isLineMenu, setIsLineMenu] = useState(false)
    const [isDayMenu, setIsDayMenu] = useState(false)

    const [headerText, setHeaderText] = useState<string>('All variations selected')
    const [lineText, setLineText] = useState<LineType>('Smooth')
    const [dayText, setDayText] = useState<'Day' | 'Week'>('Day')

    const { theme, toggleTheme } = useTheme();

    const handleChangeVariation = useCallback((name: string) => {
        changeVariations(name);
    }, [changeVariations])



    function handleLineChange(type: LineType) {
        setIsLineMenu(false)
        setLineText(type)
        changeLine(type)
    }

    function handleIsDayChange(isDay: boolean) {
        setDayText(isDay ? 'Day' : 'Week')
        setIsDayMenu(false)
        changeIsDay(isDay)
    }


    useEffect(() => {
        let newHeaderText = ''
        const activeVariations = variations.filter(item => item.isActive)
        if (activeVariations.length === 1) {
            newHeaderText = activeVariations[0].name
        } else if (activeVariations.length === variations.length) {
            newHeaderText = 'All variations selected'
        } else {
            newHeaderText = `${activeVariations.length} variations selected`
        }

        setHeaderText(newHeaderText)
    }, [variations])

    useEffect(() => {
        const closeMenus = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isCustomSelect = target.closest('.custom-select');

            if (!isCustomSelect) {
                setIsVariationMenu(false);
                setIsDayMenu(false);
                setIsLineMenu(false);
            }
        }

        window.addEventListener('click', closeMenus);

        return () => {
            window.removeEventListener('click', closeMenus);
        };
    }, [])



    const exportToPNG = useCallback(() => {
        const chartWrapperRef = document.querySelector('.graph-wrapper');
        if (!chartWrapperRef) return;

        // ищем SVG внутри обертки
        const svg = chartWrapperRef.querySelector('svg');
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'chart.png';
            link.click();
        };

        img.src = url;
    }, []);


    return (
        <div className="options">
            <div className="options__variation custom-select">
                <div className="select-header" onClick={() => setIsVariationMenu(state => !state)}>
                    <ArrowIcon isReversed={isVariatonMenu} />
                    {headerText}</div>
                <div className={`select-list ${isVariatonMenu ? '' : 'closed'}`}>
                    {variations.map(({ name, isActive }) =>
                        <div key={name} className="select-option">
                            <input id={name} name={name} type="checkbox" checked={isActive} onChange={() => handleChangeVariation(name)} />
                            <label htmlFor={name}>{name}</label>
                        </div>

                    )}
                </div>

            </div>

            <div className="options__day custom-select">
                <div className="select-header" onClick={() => setIsDayMenu(state => !state)}>
                    <ArrowIcon isReversed={isDayMenu} />
                    {dayText}</div>
                <div className={`select-list ${isDayMenu ? '' : 'closed'}`}>
                    <div className="select-option" onClick={() => handleIsDayChange(true)}>Day</div>
                    <div className="select-option" onClick={() => handleIsDayChange(false)}>Week</div>

                </div>
            </div>

            <div className="options__line-style custom-select">
                <div className="select-header" onClick={() => setIsLineMenu(state => !state)}>
                    <ArrowIcon isReversed={isLineMenu} />
                    Line style: {lineText}
                </div>
                <div className={`select-list ${isLineMenu ? '' : 'closed'}`}>
                    <div className="select-option" onClick={() => handleLineChange('Line')}>Line</div>
                    <div className="select-option" onClick={() => handleLineChange('Smooth')}>Smooth</div>
                    <div className="select-option" onClick={() => handleLineChange('Area')}>Area</div>
                </div>
            </div>

            <div className="options__theme" onClick={toggleTheme}>
                {theme} mode
            </div>
            <div className="options__theme" onClick={exportToPNG}>
                PNG
            </div>
        </div >
    )
}, (prev, next) => prev.variations === next.variations)
export default OptionPanel
