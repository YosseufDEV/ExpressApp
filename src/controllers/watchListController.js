import { prisma } from "../config/db.js";

export const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

    const movie = await prisma.movie.findUnique({ where: { id: movieId } });

    if(!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    const existingInWatchList = await prisma.watchListItem.findUnique({ 
        where: {
            userId_movieId: {
                userId: req.user.id,
                movieId: movieId
            }
        }
    });

    if(existingInWatchList) {
        return res.status(400).json({ message: "Movie already in watch list" });
    }

    const watchListItem = await prisma.watchListItem.create({ 
        data: {
            userId: req.user.id, 
            movieId,
            status: status || "PLANNED",
            rating,
            notes
        }
    })

    res.status(201).json({
        status: "success",
        data: {
            watchListItem
        }
    });
}

export const deleteFromWatchList = async (req, res) => {
    const { id } = req.params;
    const watchListItem = await prisma.watchListItem.findUnique({ where: { id: id } });

    if(!watchListItem) {
        return res.status(404).json({ message: "Watch list item not found" });
    }

    if(watchListItem.userId !== req.user.id) {
        return res.status(403).json({ message: "Forbidden, Not owned by the user" });
    }

    const deletedItem = await prisma.watchListItem.delete({ where: { id: id } });

    res.status(200).json({
        status: "success",
        data: {
            deletedItem
        }
    });
}
