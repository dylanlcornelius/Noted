import query from '../database/database';

export default {
    getUser(id: string) {
        return query('SELECT * FROM public.users WHERE "id" = $1;', [id]);
    },
    postUser(email: string) {
        return query('INSERT INTO public.users (email) VALUES ($1);', [email]);
    }
}
