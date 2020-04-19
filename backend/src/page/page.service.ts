import query from '../database/database';
import { Page } from './page.model';

export default { 
    getPages(uid: string) {
        return query('SELECT * FROM public.pages WHERE author = $1;', [uid]);
    },
    postPage(title: string, type: string, uid: string) {
        return query('INSERT INTO public.pages (title, type, is_default, author, editor) VALUES ($1, $2, $3, $4, $5);', [title, type, false, uid, uid]);
    },
    putPage(uid: string, page: Page) {
        return query('UPDATE public.pages SET title=$1, is_default=$2, editor=$3, parent_page=$4, "order"=$5, is_open=$6 WHERE pages.id=$7', [page.title, page.default, uid, page.parentPage, page.order, page.isOpen, page.id]);
    },
    deletePage(id: string) {
        return query('DELETE FROM public.pages WHERE id = $1', [id]);
    },
    getChildPages(pages: any[]) {
        return pages.map(page => {
            const childPages: any[] = [];

            pages.forEach(childPage => {
                if (childPage.parent_page === page.id) {
                    childPages.push(childPage.id);
                }
            });

            page.childPages = childPages;
            return page;
        });
    }
}
