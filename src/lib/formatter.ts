

export const formatRupiah = (amount: number) => {
    return `Rp${amount.toLocaleString('id-ID')}`;
}

export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}