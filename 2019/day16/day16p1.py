signal = '59717238168580010599012527510943149347930742822899638247083005855483867484356055489419913512721095561655265107745972739464268846374728393507509840854109803718802780543298141398644955506149914796775885246602123746866223528356493012136152974218720542297275145465188153752865061822191530129420866198952553101979463026278788735726652297857883278524565751999458902550203666358043355816162788135488915722989560163456057551268306318085020948544474108340969874943659788076333934419729831896081431886621996610143785624166789772013707177940150230042563041915624525900826097730790562543352690091653041839771125119162154625459654861922989186784414455453132011498'
# signal = '12345678'
phases = 100

#   123456789
# 1  p0n0p0n0p
# 2  0pp00nn00
# 3  00ppp000n
# 4  000pppp00


def dot(signal, patternLength):
    offsetLength = len(signal) - (patternLength - 1)
    # the end of the signal is this length into the pattern
    endOffset = offsetLength % (patternLength * 4)

    newSignal = int(signal[(patternLength - 1):])
    phaseLoc = endOffset - 1 if endOffset - 1 >= 0 else patternLength * 4 - 1

    result = 0
    while newSignal > 0:
        if phaseLoc < patternLength:
            result += newSignal % 10
        if phaseLoc >= patternLength * 2 and phaseLoc < patternLength * 3:
            result -= newSignal % 10
        newSignal //= 10
        phaseLoc -= 1
        if phaseLoc == -1:
            phaseLoc = patternLength * 4 - 1
    return result


def fft(signal):
    length = len(signal)
    output = ''
    for patternLength in range(1, length + 1):
        output += str(abs(dot(signal, patternLength)) % 10)
    return output


for i in range(phases):
    print(i)
    signal = fft(signal)


print(signal)
