export type Variation = {
    id?: number,
    name: string
}

export type Data = {
    "date": string,
    "visits": Record<string, number>,
    "conversions": Record<string, number>
}

export type DataFromJson = {
    variations: Variation[],
    data: Data[]

}

export type ChartDataItem = {
    date: string;
    [variantName: string]: number | string;
};

export type ConvertedData = {
    name: string,
    id: number,
    dates: {
        date: string,
        uv: number
    }
}

export type WeeklyData = {
    date: string;
    [value: string]: string | number;
}

export type TooltipPayloadItem = {
    name: string;
    value: number;
    stroke?: string;
};

export type ChartProps = {
    data: ChartDataItem[],
    variations: Variation[],
    line: string
}

export type ExtendedVariation = Variation & {
    isActive: boolean;
};

export type OptionPanelProps = {
    changeVariations: (name: string) => void;
    changeLine: React.Dispatch<React.SetStateAction<string>>;
    changeIsDay: React.Dispatch<React.SetStateAction<boolean>>;
    variations: ExtendedVariation[]
}

export type Theme = 'light' | 'dark'

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

export type LineType = 'Smooth' | 'Line' | 'Area'