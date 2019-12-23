signal = '59717238168580010599012527510943149347930742822899638247083005855483867484356055489419913512721095561655265107745972739464268846374728393507509840854109803718802780543298141398644955506149914796775885246602123746866223528356493012136152974218720542297275145465188153752865061822191530129420866198952553101979463026278788735726652297857883278524565751999458902550203666358043355816162788135488915722989560163456057551268306318085020948544474108340969874943659788076333934419729831896081431886621996610143785624166789772013707177940150230042563041915624525900826097730790562543352690091653041839771125119162154625459654861922989186784414455453132011498'
signal = signal * 10000
offset = 5971723
phases = 100


signal2h = signal[offset:]


def transform(signal2h):
    result = ''
    cumulative = 0
    for c in reversed(signal2h):
        cumulative += int(c)
        cumulative %= 10
        result += str(cumulative)
    return result[::-1]


for i in range(phases):
    print(i)
    signal2h = transform(signal2h)

print(signal2h[:8])
